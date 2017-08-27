function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function login(){
    var username = $('#username-input').val();

    if (username == ""){
        $('#login-failed-msg').show();
        return
    }

    $.ajax({
        url: 'api/auth',
        method: 'post',
        data: {'username': username},
        success: function (data, statusText, request) {
            setUsername(data.username);
            search_profiles();
            scrollDown();
            $('#search-input').focus();
            $('#login-failed-msg').hide();
        },
        error: function (resp) {
            $('#login-failed-msg').show();
        }
    });
}

function logout(){
    $.ajax({
        url: 'api/auth',
        method: 'delete',
        success: function(){
            $('#username-input').focus();
        }
    });

    scrollUp();
    setUsername('User');
    updateFoundProfiles();
}


function search_profiles(){
    var username = $('#search-input').val();
    var status = $('#search-status-select').val();

    $.ajax({
        url: 'api/profiles',
        method: 'get',
        data: {
            'username__icontains': username,
            'status': status,
            'page': page
        },
        success: function(resp){
            updateFoundProfiles(resp);
        },
        failure: function (resp) {
            updateFoundProfiles()
        }
    });
}

function updateUserStatus(status){
    $.ajax({
        url: 'api/me/',
        method: 'patch',
        data: {
            'status': status
        },
        success: function(resp){
            search_profiles()
        },
    });
}


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$(function(){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });

    $.ajax({
        url: 'api/me',
        method: 'get',
        success: function(resp){
            scrollDown(true);
            setUsername(resp.username);
            search_profiles();
        },
        failure: function (resp) {
            alert('Fail');
        }
    });
});
