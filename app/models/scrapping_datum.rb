require "nokogiri"
require "open-uri"
require "pry"

class ScrappingDatum < ApplicationRecord

  def ca_from_banker_adda
    ca_array = []
    url_banker_adda = "https://www.bankersadda.com/current-affairs-december-2020/"
    adda_ca_url = get_adda_ca_lnk(url_banker_adda)

    doc_adda = get_data(adda_ca_url)
    element_collection = doc_adda.css(".entry-content").children
    ca_array = traverse_to_element(element_collection, ca_array, false)
    return ca_array
  end
    
  def ca_from_pendulum
    ca_array = []
    url_pendulum_page = "https://pendulumedu.com/current-affairs"
    pendulum_ca_url = get_pendulum_ca_lnk(url_pendulum_page)

    doc_pendulum = get_data(pendulum_ca_url)
    collection = doc_pendulum.css("#discriptionca")
    collection.children.each do | child |
      if (child.name == "h2") && (child.children[0].name == "strong")
        ca_array[ca_array.length] = {title: child.text}
      end
      if child.name == "ul"
        hs = ca_array[ca_array.length-1]
        hs[:description] = child.to_xml
      end
    end
    return ca_array
  end

  def ca_from_byscoop
    # update on evening
    ca_array = []
    is_only_header = false
    url_byscoop_page = "https://www.byscoop.com/daily-current-affairs/"
    byscoop_ca_url = get_byscoop_ca_lnk(url_byscoop_page)
    doc_byscoop = get_data(byscoop_ca_url)
    collection = doc_byscoop.css(".entry-content")

    collection.children.each do | child |
      if (child.name == "h3") && (child.at("span").attributes["class"].value == "ez-toc-section")
        #ch.at("span").attributes["class"].value 
        if (ca_array.length > 0) && (ca_array[ca_array.length - 1]["description"].blank?)
          ca_array[ca_array.length - 1] = {title: child.text}
        else
          ca_array[ca_array.length] = {title: child.text}
        end
      elsif child.name == "p" && child.children[0].name=="span" && child.children[0].children[0].name == "strong"
        ca_array[ca_array.length] = {title: child.text}
        is_only_header = true;
      end
      if child.name == "ul"
        hs = ca_array[ca_array.length-1]
        hs[:description] = child.to_xml
        is_only_header = false;
      end
    end
    return ca_array
  end
    
  def ca_from_adda_247
    # update on evening
    ca_array = []
    url_247 = "https://currentaffairs.adda247.com/"
    doc_247 = get_data(url_247)
    ca_list_collection = doc_247.css(".wp-block-column")[0].at("ul").children
    current_affairs_date = get_recently_ca_date(ca_list_collection[0])

    ca_list_collection.each do | record |

      ca_date = get_recently_ca_date(record)
      if current_affairs_date == ca_date
        title = record.children.at("a").text
        href = record.children.at("a").values[0]
        doc_of_247_link = get_data(href)
        ca_array[ca_array.length] = get_247_link_ca_data(title, doc_of_247_link)
      end
    end

    return ca_array
  end

  def save_scrap_data(scrapping_data, data_source)
    scrapping_data.each do | datum |
      scrapping_datum = ScrappingDatum.where(title: datum[:title])
      ScrappingDatum.create(title: datum[:title], description: datum[:description], keypoints: datum[:keypoints], source: data_source, ca_date: Time.now) if scrapping_datum.blank?
    end
  end

  private

  def traverse_to_element(collection, ca_array, is_keypoints)

    collection.each_with_index do |child, index|
      if child.name == "p" and child.children[0].name == "strong"
        hdr_txt = child.text
        title = (hdr_txt =~ /\d+\./)
        keypoints = hdr_txt.downcase.index("important")
        if(title != nil) && (title == 0) && keypoints.blank?
          ca_array[ca_array.length] = {title: child.text}
        elsif keypoints.present? && (keypoints == 0) && title.blank?
          is_keypoints = true;
        end
      end
      if child.name == "ul"
        hs = ca_array[ca_array.length - 1]
        if !is_keypoints
          hs[:description] = child.to_xml # get_all_child(child).join("\n")
        elsif is_keypoints
          hs[:keypoints] = child.to_xml
          is_keypoints = false
        end
        #puts child.text
      end
      if child.name == "div"
        traverse_to_element(child.children, ca_array, is_keypoints)
        is_keypoints = false
      end
    end
    return ca_array
  end

  def get_247_link_ca_data(title, doc_of_247_link)
    is_keypoints = false
    keypoints = ''
    paragraphes = doc_of_247_link.css(".entry-content")
    paragraphe_txt = ''
    paragraphes.children.each do | child |
      if child.name == "p" && child.at("img").blank? && child.at("a").blank?
        if (child.text.index("Important takeaways") == 0)
          is_keypoints = true
        else
          paragraphe_txt.concat(child.to_xml)
        end
      end
      if child.name == "ul"
        if is_keypoints == true
          keypoints = child.to_xml
        else
          paragraphe_txt.concat(child.to_xml)
        end
      end
    end
    return {title: title, description: paragraphe_txt, keypoints: keypoints}
  end

  def get_recently_ca_date(record)
    list_txt = record.text
    link_txt = record.at("a").text
    date_txt = list_txt[link_txt.length..list_txt.length]
    date_obj = Time.parse(date_txt).strftime("%B %0d, %Y")
    return date_obj
  end

  def get_byscoop_ca_lnk(url_byscoop_page)
    doc_byscoop_page = get_data(url_byscoop_page)
    link_collection = doc_byscoop_page.css("#pt-cv-view-33db1a14je").children[0].css(".pt-cv-content-item")
    return link_collection.at("a").values[0]
  end

  def get_pendulum_ca_lnk(url_pendulum_page)
    doc_byscoop_page = get_data(url_pendulum_page)
    link_collection = doc_byscoop_page.css(".item-box-blog")
    return link_collection[0].at("a").values[0]
  end

  def get_adda_ca_lnk(url_banker_adda)
    doc_adda_page = get_data(url_banker_adda)
    #~ link_collection = doc_adda_page.css("#lcp_instance_0>li>a")[0].values[0]
    link_collection = doc_adda_page.css("#lcp_instance_0>li")
    return link_collection[0].at("a").values[0]
  end

  def get_data(url)
    html_data = open(url)
    return Nokogiri::HTML(html_data)
  end

end

