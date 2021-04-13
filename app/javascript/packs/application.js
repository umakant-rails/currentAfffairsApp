// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
//import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import { tinyMce } from "../packs/tinymce"
import "@fortawesome/fontawesome-free/css/all"
require("bootstrap");
require("@fortawesome/fontawesome-free/js/all");
require("packs/layout.js")
require("packs/scrapping_data")
require("packs/question")
require("packs/questionnaire")
require("packs/transliteration.I")
require("packs/presentation")
require("packs/presentation_questionnaire")
require("packs/presentation_factsheet")
require("packs/factsheet")
require("packs/factsheet_folder")
require("packs/report")

require("moment/locale/ja")
require("tempusdominus-bootstrap-4")
Rails.start()
//Turbolinks.start()
ActiveStorage.start()
$(document).ready(function(){
  tinyMce();
});