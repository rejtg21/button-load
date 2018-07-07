module.exports = {
    bindings: {
        loadingTxt: '@',
        onClick: '&ngClick',
        bindTxt: '=ngBind'
    },
    controller: ButtonLoadComponentController
};

ButtonLoadComponentController.$inject = ['$element', '$rootScope', '$q'];

function ButtonLoadComponentController($element, $rootScope, $q) {
    var currentText, binding = false;

    this.$onInit = () => {
        // if bindTxt does have a value it means there is a binding
        if (this.bindTxt)
            binding = true;

        currentText = angular.copy(this.bindTxt) || $element.text();
    }

    $element.on('click', (e) => {
        e.preventDefault();
        // to prevent ng click from working
        e.stopImmediatePropagation();
        // if empty do nothing
        if (!this.onClick) return;
        // disable the button
        disable();

        let defer = this.onClick(e);

        // check for promises
        // if promise is not used it means it is a synchronous function
        if (defer == undefined || defer.then == undefined) {
            // enable now the button
            enable();
            return true;
        }

        // asynchronous
        defer.then((result) => {
            enable();
            return result;
        }, (err) => {
            enable();
            $q.reject(err);
        });
    });

    var disable = () => {
        $element.attr('disabled', 'disabled');
        $element.attr('readonly', 'readonly');
        // if there is a specified loading text it will be use as alternate text when button is disabled
        // else the current text will be converted to progressive form.
        let alternateText = this.loadingTxt || progressiveForm(currentText);
        replaceText(alternateText);
    }

    var enable = () => {
        $element.removeAttr('disabled');
        $element.removeAttr('readonly');
        // when enabling return the current text
        replaceText(currentText);
    }

    var replaceText = (text) => {
        // change the binding value if there is a binding
        if (binding) {

            $rootScope.$evalAsync(() => {
                this.bindTxt = text;
            });
            return;
        }

        // if there is no binding change normally
        $element.html(text);
    }

    var progressiveForm = (text) => {
        // let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
        let vowels = ['e', 'E'];
        let progressiveText = 'ing ...';
        // split the value to array
        let unFormatText = text.trim().split("");

        // check the last text if it is a vowel
        if (vowels.indexOf(unFormatText[unFormatText.length - 1]) != -1) {
            // if it is a vowel convert it to progressive form
            unFormatText[unFormatText.length - 1] = progressiveText;
        }

        // additional condition soon.
        return unFormatText.join("");
    }
}
