module Admin::CurrentAffairsHelper

  def questionnaire_categories_hash(questionnaire_categories)
    arr = []
    questionnaire_categories = QuestionnaireCategory.all
    questionnaire_categories.each do |element|
      arr<<[element.name, element.id]
    end
    return arr
  end

end
