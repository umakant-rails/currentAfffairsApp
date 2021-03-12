import tinymce from 'tinymce/tinymce';
//import 'tinymce/themes/modern/theme';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.min';
import 'tinymce/skins/ui/oxide/content.min';
import 'tinymce/icons/default';

import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/textcolor';


function tinyMce() {
  tinymce.init({
    selector: 'textarea.tinymce',
    height: 500,
    width: 1080,
    //language: 'hi_IN',
    plugins: [
      'table', 'lists', 'textcolor'
    ],
    toolbar: 'undo redo | formatselect | ' +
       ' bold italic backcolor forecolor | alignleft aligncenter ' +
       ' alignright alignjustify | bullist numlist outdent indent | ' +
       ' removeformat | help'
  });
}

// if you're using a language file, you can place its content here
export { tinyMce };