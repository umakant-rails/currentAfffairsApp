module ApplicationHelper

  def get_question_index(page, index)
    return (page-1)*10 + (index+1)
  end

  def is_action_edit(question)
    return question.id.present?
  end

  def is_answer(option, answer)
    return (option == answer) ? "option-is-answer" : ""
  end
  
  def questionnaire_categories_hash
    arr = []
    questionnaire_categories = QuestionnaireCategory.all
    questionnaire_categories.each do |element|
      arr<<[element.name, element.id]
    end
    return arr
  end

  def link_to_add_fields(name, f, association)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize + "_fields", f: builder)
    end
    link_to(name, '#', class: "add_fields col-md-12", data: {id: id, fields: fields.gsub("\n", "")})
  end
end
