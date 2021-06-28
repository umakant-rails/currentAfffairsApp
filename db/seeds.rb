User.create(username: 'umakant005', email: 'umakantrajpoot@gmail.com', 
  password: '12345678', password_confirmation: '12345678', role_id:1,
  confirmed_at: Date.today) if User.where(email: 'umakantrajpoot@gmail.com').blank?
User.create(username: 'umakant006', email: 'umakant006@gmail.com', 
  password: '12345678', password_confirmation: '12345678', role_id:2,
  confirmed_at: Date.today) if User.where(email: 'umakant006@gmail.com').blank?
State.create!(name: "Arunachal Pradesh") if State.where(name: "Arunachal Pradesh").blank?
State.create!(name: "Himachal Pradesh") if State.where(name: "Himachal Pradesh").blank?
State.create!(name: "Jammu & Kashmir") if State.where(name: "Jammu & Kashmir").blank?
State.create!(name: "Andhra Pradesh") if State.where(name: "Andhra Pradesh").blank?
State.create!(name: "Madhya Pradesh") if State.where(name: "Madhya Pradesh").blank?
State.create!(name: "Uttar Pradesh") if State.where(name: "Uttar Pradesh").blank?
State.create!(name: "Chhattisgarh") if State.where(name: "Chhattisgarh").blank?
State.create!(name: "Maharashtra") if State.where(name: "Maharashtra").blank?
State.create!(name: "West Bengal") if State.where(name: "West Bengal").blank?
State.create!(name: "Uttarakhand") if State.where(name: "Uttarakhand").blank?
State.create!(name: "Rajasthan") if State.where(name: "Rajasthan").blank?
State.create!(name: "Tamilnadu") if State.where(name: "Tamilnadu").blank?
State.create!(name: "Telangana") if State.where(name: "Telangana").blank?
State.create!(name: "Meghalaya") if State.where(name: "Meghalaya").blank?
State.create!(name: "Jharkhand") if State.where(name: "Jharkhand").blank?
State.create!(name: "Karnatka") if State.where(name: "Karnatka").blank?
State.create!(name: "Hariyana") if State.where(name: "Hariyana").blank?
State.create!(name: "Nagaland") if State.where(name: "Nagaland").blank?
State.create!(name: "Tripura") if State.where(name: "Tripura").blank?
State.create!(name: "Manipur") if State.where(name: "Manipur").blank?
State.create!(name: "Punjab") if State.where(name: "Punjab").blank?
State.create!(name: "Gujrat") if State.where(name: "Gujrat").blank?
State.create!(name: "Kerala") if State.where(name: "Kerala").blank?
State.create!(name: "Sikkim") if State.where(name: "Sikkim").blank?
State.create!(name: "Delhi") if State.where(name: "Delhi").blank?
State.create!(name: "Bihar") if State.where(name: "Bihar").blank?
State.create!(name: "Udisa") if State.where(name: "Udisa").blank?
State.create!(name: "Asam") if State.where(name: "Asam").blank?
State.create!(name: "Goa") if State.where(name: "Goa").blank?

QuestionCategory.create(name: 'Appointments') if QuestionCategory.where(name: 'Appointments').blank?
QuestionCategory.create(name: 'Resigns') if QuestionCategory.where(name: 'Resigns').blank?
QuestionCategory.create(name: 'Deaths') if QuestionCategory.where(name: 'Deaths').blank?
QuestionCategory.create(name: 'International affairs') if QuestionCategory.where(name: 'International affairs').blank?
QuestionCategory.create(name: 'Awards & Honours') if QuestionCategory.where(name: 'Awards & Honours').blank?
QuestionCategory.create(name: 'Books') if QuestionCategory.where(name: 'Books').blank?
QuestionCategory.create(name: 'Committees') if QuestionCategory.where(name: 'Committees').blank?
QuestionCategory.create(name: 'Conferences') if QuestionCategory.where(name: 'Conferences').blank?
QuestionCategory.create(name: 'Days & Dates') if QuestionCategory.where(name: 'Days & Dates').blank?
QuestionCategory.create(name: 'Banking and Finance') if QuestionCategory.where(name: 'Banking and Finance').blank?
QuestionCategory.create(name: 'Places') if QuestionCategory.where(name: 'Places').blank?
QuestionCategory.create(name: 'Politics') if QuestionCategory.where(name: 'Politics').blank?
QuestionCategory.create(name: 'Science & Technology') if QuestionCategory.where(name: 'Science & Technology').blank?
QuestionCategory.create(name: 'Sports & Games') if QuestionCategory.where(name: 'Sports & Games').blank? 
QuestionCategory.create(name: 'New Program/Scheme') if QuestionCategory.where(name: 'New Program/Scheme').blank?
QuestionCategory.create(name: 'National Affairs') if QuestionCategory.where(name: 'National Affairs').blank?
QuestionCategory.create(name: 'Others') if QuestionCategory.where(name: 'Others').blank?
QuestionCategory.create(name: 'Ratings') if QuestionCategory.where(name: 'Ratings').blank?
QuestionCategory.create(name: 'Index') if QuestionCategory.where(name: 'Index').blank?
QuestionCategory.create(name: 'MOU/MOA') if QuestionCategory.where(name: 'MOU/MOA').blank?
QuestionCategory.create(name: 'Mobile App') if QuestionCategory.where(name: 'Mobile App').blank?

QuestionnaireCategory.create(name: 'Daily Current Affairs') if QuestionnaireCategory.where(name: 'Daily Current Affairs').blank?
QuestionnaireCategory.create(name: 'Computer Awareness') if QuestionnaireCategory.where(name: 'Computer Awareness').blank?
QuestionnaireCategory.create(name: 'Banking') if QuestionnaireCategory.where(name: 'Banking').blank?
