require 'json'
namespace :custom_task do
  desc "insert category_id entry from question table to question_category_question table"
  task :task1 => :environment do
    questions = Question.all
    questions.each_with_index do |  ques, ind |
  	  object = nil #QuestionCategoryQuestion.where(question_id: ques.id, question_category_id: ques.question_category_id) 
  	  #puts ind.to_s + " -- " + ques.id.to_s + " ***** "+ques.question_category_id.to_s
  	  if object.blank?
  		  QuestionCategoryQuestion.create(question_id: ques.id, question_category_id: rand(0...7))
  	  end
    end
  end
  
  task :models_backup => :environment do
    questionnaires = Questionnaire.all.to_json
    questions = Question.all.to_json
    fs_folders = FactsheetFolder.all.to_json
    factsheets = Factsheet.all.to_json
    qcqs = QuestionCategoryQuestion.all.to_json
    qstnr_ques = QuestionnaireQuestion.all.to_json

    hs = {'questionnaires' => questionnaires, 'questions' => questions,
      "fs_folders" => fs_folders, "factsheets" => factsheets, 
      "qcqs" => qcqs, "qstnr_ques" => qstnr_ques}
    
    open('./sample-data.json', 'w') do | f |
      f.write(hs)
    end
  end

  task :models_restore => :environment do
    file = File.read('./sample-data.json')         

    json_str = eval(file)["questionnaires"]
    JSON.parse(json_str).each do |obj|
      Questionnaire.create!(name: obj['name'], questionnaire_category_id: obj['questionnaire_category_id'], user_id: 1, created_at: obj['created_at'], updated_at: obj['updated_at'])
    end
    json_str = eval(file)["questions"]
    JSON.parse(json_str).each do |obj|
      Question.create!(question: obj['question'], option1: obj['option1'], option2: obj['option2'], option3: obj['option3'], option4: obj['option4'], answer: obj['answer'], keypoints: obj['keypoints'], facts: obj['facts'], state_id: obj['state_id'], scrapping_datum_id: obj['scrapping_datum_id'].to_i, questionnaire_id: obj['questionnaire_id'].to_i, created_at: obj['created_at'], updated_at: obj['updated_at'], user_id: 1)
    end
    json_str = eval(file)["fs_folders"]
    JSON.parse(json_str).each do |obj|
      FactsheetFolder.create(name: obj['name'], questionnaire_category_id: obj['questionnaire_category_id'], created_at: obj['created_at'], updated_at: obj['updated_at'], user_id: 1)
    end  
    json_str = eval(file)["factsheets"]
    JSON.parse(json_str).each do |obj|
      Factsheet.create(title: obj['title'], description: obj['description'],
      factsheet_folder_id: obj['factsheet_folder_id'], created_at: obj['created_at'], updated_at: obj['updated_at'], user_id: 1)
    end
    json_str = eval(file)["qstnr_ques"]
    JSON.parse(json_str).each do |obj|
      QuestionnaireQuestion.create!(question_id: obj['question_id'],
        questionnaire_id: obj['questionnaire_id'], created_at: obj['created_at'], updated_at: obj['updated_at']) rescue ''
    end
    json_str = eval(file)["qcqs"]
    JSON.parse(json_str).each do |obj|
      QuestionCategoryQuestion.create!(question_id: obj['question_id'],
        question_category_id: obj['question_category_id'], created_at: obj['created_at'], updated_at: obj['updated_at']) rescue ''
    end
  end
end
