module Admin::QuestionnairesHelper

  def questionnaire_categories_hash(questionnaire_categories)
    arr = []
    questionnaire_categories = QuestionnaireCategory.all
    questionnaire_categories.each do |element|
      arr<<[element.name, element.id]
    end
    return arr
  end

  def is_answer(question, option)
    answer_cls = ""
    if (option == 1)
      answer_cls = (question.option1 == question.answer) ? "option-is-answer" : ""
    elsif (option == 2)
      answer_cls = (question.option2 == question.answer) ? "option-is-answer" : ""
    elsif (option == 3)
      answer_cls = (question.option3 == question.answer) ? "option-is-answer" : ""
    elsif (option == 4)
      answer_cls = (question.option4 == question.answer) ? "option-is-answer" : ""
    end 
    return answer_cls 
  end

  def is_keypoints_exist(question)
    return question.keypoints.present?
  end
end
