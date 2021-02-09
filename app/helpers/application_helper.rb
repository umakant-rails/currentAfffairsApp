module ApplicationHelper

  def get_question_index(page, index)
    return (page-1)*10 + (index+1)
  end

  def is_action_edit(question)
    return question.id.present?
  end
end
