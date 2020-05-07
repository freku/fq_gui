window.onload = function(e) {
    $('#main').hide();

    var isShown = false;
    var currentHalfClick = undefined;
    var lang;
    
    window.addEventListener("message", (event) => {
        var item = event.data;
        if (item !== undefined && item.action == "UI") {
            if(item.display === true) {
                $('#main').show();
                isShown = true;
            } else {
                $('#main').hide();
                isShown = false;
            }
        }
        if (item !== undefined && item.action == "UPDATE") {
            if (item.hp != undefined && item.armor != undefined) {
                updateItemNumber(item.hp, item.armor);
            }
        }
        if (item !== undefined && item.type == "SET_LANG") {
            if (item.lang !== undefined) {
                lang = item.lang
                
                if (lang == 'pl') {
                    translateAll();
                }
            }
        }
    })
    
    window.translateAll = function() {
        $('#help-msg').text('KILKNIJ 2 RAZY ABY WYBRAĆ');
        $('#aid-kit-name').text('Ulecz się.');
        $('#aid-kit-desc').text('Apteczka');
        $('#-shop-name').text('Sklep');
        $('#-shop-desc').text('Otwórz menu sklepu.');
        $('#change-gang-name').text('Zmień gang.');
        $('#change-gang-desc').text('Zmien gang, w którym aktualnie jesteś.');
        $('#armour-name').text('Armor.');
        $('#armour-desc').text('Napraw swój armor.');
        $('#take-over-name').text('Atakuj strefe.');
        $('#take-over-desc').text('Zacznij przejmowanie terytorium.');
    }
    
    // $(document).keydown((event) => {
    //     if(event.which == 88) {
    //         if (isShown) {
    //             $.post('http://fq_gui/callAction', JSON.stringify({
    //                 action: 'CLOSE_UI'
    //             }));
    //             if (currentHalfClick != undefined) {
    //                 $("li[tabindex='"+currentHalfClick+"']").children('.bg').toggleClass('half-click');
    //                 currentHalfClick = undefined;
    //             }
    //         }
    //     }
    // });

    $(document).keyup((event) => {
        if(event.which == 88) {
            if (isShown) {
                $.post('http://fq_gui/callAction', JSON.stringify({
                    action: 'CLOSE_UI'
                }));
                
                if (currentHalfClick != undefined) {
                    $("li[tabindex='"+currentHalfClick+"']").children('.bg').toggleClass('half-click');
                    currentHalfClick = undefined;
                }
            }
        }
    });

    $('li').click(function() {
        if (currentHalfClick == undefined) {
            currentHalfClick = $(this).attr('tabindex');
        } else if (currentHalfClick == $(this).attr('tabindex')) {
            // call action
            $.post('http://fq_gui/callAction', JSON.stringify({
                action: 'CLOSE_UI'
            }));
            $.post('http://fq_gui/callAction', JSON.stringify({
                action: 'CALL_ACTION',
                id: currentHalfClick
            }));
            currentHalfClick = undefined;
        } else {
            $("li[tabindex='"+currentHalfClick+"']").children('.bg').toggleClass('half-click');
            currentHalfClick = $(this).attr('tabindex');
        }

        $(this).children('.bg').toggleClass('half-click');
    });

    window.updateItemNumber = function(hp, armor) {
        $('#hp').html(hp + '/3');
        $('#armor').html(armor + '/3');
    }
}