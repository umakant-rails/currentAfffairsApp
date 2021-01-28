module Admin::PresentationsHelper

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
