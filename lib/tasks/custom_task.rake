namespace :custom_task do
  desc "insert category_id entry from question table to question_category_question table"
  task :task1 => :environment do
    questions = Question.all
    puts questions.length
    questions.each_with_index do |  ques, ind |
	  object = nil #QuestionCategoryQuestion.where(question_id: ques.id, question_category_id: ques.question_category_id) 
	  #puts ind.to_s + " -- " + ques.id.to_s + " ***** "+ques.question_category_id.to_s
	  if object.blank?
		  QuestionCategoryQuestion.create(question_id: ques.id, question_category_id: rand(0...7))
	  end
    end
  end
end
