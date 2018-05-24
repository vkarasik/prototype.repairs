$(function () {

    $('#date').datetimepicker({
        locale: 'ru',
        format: 'YYYY-MM-DD'
    });

    $('select').on('change', checkInput)

    $('#date').on("dp.change", checkInput)

    $('#search').on('click', searchText)

    $('.date-col, .status-col').on('click', sortDate)

    function checkInput() {
        var date = $('#date input').val();
        var dateMillieconds = Date.parse(date); // получим выбранную дату в мс
        var status = $('select option:selected').attr('id'); // получим выбранный статус

        $('#orders tr').each(function () {
            var orderDate = $(this).attr('data-date').replace(/\./g, '-'); // дата для firefox в формате yyyy-mm-dd
            console.log(orderDate)
            var orderDateMillieconds = Date.parse(orderDate); // получим дату заказа из строки в мс
            console.log(orderDateMillieconds)
            var orderStatus = $(this).attr('data-status'); // получим статус заказа

            if ((status === 'status-all') && (date == '')) {
                $(this).show();
            }
            else if ((status === 'status-all') && (dateMillieconds <= orderDateMillieconds)) {
                $(this).show();
            }
            else if ((status === orderStatus) && (dateMillieconds <= orderDateMillieconds)) {
                $(this).show();
            }
            else if ((status === orderStatus) && (date == '')) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        })
    }

    function searchText() {
        var searchText = $('#search-text').val().toLowerCase();
        $('#search-text').val('')
        if (searchText === '') {
            checkInput();
        }
        else {
            $('tbody tr').each(function () {
                var tdData = (($(this)[0].innerText).toLowerCase())
                if (tdData.indexOf(searchText) === -1) {
                    $(this).hide()
                }
            })
        }
    }

    function sortDate(){
        $(this).find("span").toggleClass('glyphicon-sort-by-attributes-alt');
    }
});

// Я зрабіў усё што змог, хто зможа, хай зробіць лепш!
