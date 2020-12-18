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
    ca_array = traverse_to_element(element_collection, ca_array)
    return ca_array
  end

  def traverse_to_element(collection, ca_array)

   collection.each_with_index do |child, index|
     if child.name == "p" and child.children[0].name == "strong"
        hdr_txt = child.text
        hdr_sqnc = (hdr_txt =~ /\d+\./) || hdr_txt.downcase.index("important")
        if(hdr_sqnc != nil) && (hdr_sqnc == 0)
          #puts child.text
          ca_array[ca_array.length] = {'title' => child.text}
        end
       end
      if child.name == "ul"
        hs = ca_array[ca_array.length - 1]
        hs['description'] = get_all_child(child)
        #puts child.text
      end
      if child.name == "div"
        traverse_to_element(child.children, ca_array)
      end
    end
    return ca_array
  end
    
  def get_all_child(child)
    ar = []
    child.css("li").each do | li |
      ar << li.text
    end
    return ar 
  end
  def ca_from_pendulum
    url_pendulum_page = "https://pendulumedu.com/current-affairs"
    pendulum_ca_url = get_pendulum_ca_lnk(url_pendulum_page)

    doc_pendulum = get_data(pendulum_ca_url)
    header_collection = doc_pendulum.css("#discriptionca>h2")
    text_collection = doc_pendulum.css("#discriptionca>ul")
    header_collection.each_with_index do |hd, index |
      puts "\n\n"
      puts hd.text
      puts " ------------------"
      puts text_collection[index].text
      end
  end
    
  def ca_from_byscoop
    # update on evening
    url_byscoop_page = "https://www.byscoop.com/daily-current-affairs/"
    byscoop_ca_url = get_byscoop_ca_lnk(url_byscoop_page)
    
    doc_byscoop = get_data(byscoop_ca_url)
      header_collection = doc_byscoop.css(".entry-content>h3")
      text_collection = doc_byscoop.css(".entry-content>ul")
      header_collection.each_with_index do |hd, index |
      puts "\n\n"
      puts hd.text
      puts " ------------------"
      puts text_collection[index].text
      end
  end
    
  def ca_from_adda247
    # update on evening
      url_247 = "https://currentaffairs.adda247.com/"
      doc_247 = get_data(url_247)
      ca_list_collection = doc_247.css(".wp-block-column")[0].at("ul").children
      ca_list_collection.each do | record |
      list_txt = record.text
      link_txt = record.at("a").text
      date_txt = list_txt[link_txt.length..list_txt.length]
      date = Time.parse(date_txt).strftime("%B %0d, %Y")
      puts date + " : " + link_txt
    end
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
#scrap = Scrapper.new.ca_from_banker_adda
