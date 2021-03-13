module ApplicationHelper

  def get_question_index(page, index)
    return (page-1)*10 + (index+1)
  end

  def is_action_edit(question)
    return question.id.present?
  end

  def questionnaire_categories_hash
    arr = []
    questionnaire_categories = QuestionnaireCategory.all
    questionnaire_categories.each do |element|
      arr<<[element.name, element.id]
    end
    return arr
  end

end
