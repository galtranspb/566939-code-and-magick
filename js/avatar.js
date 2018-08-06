'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('input[name=avatar]');
  var preview = document.querySelector('.setup-user-pic');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  var onFileChooserLoad = function (evt) {
    preview.src = evt.target.result;
    setupOpenIcon.src = evt.target.result;
  };

  var onFileChooserChange = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', onFileChooserLoad);
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onFileChooserChange);

})();
