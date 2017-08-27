var scrollTime = 800;
var page = 1;

var statuses = {
    'working': 'Working',
    'business_trip': 'Business Trip',
    'vacation': 'On Vacation'
};


function scrollDown(fast){
    if (fast === true){
        window.scrollTo(0, $(window).height());
    }else {
        $('html, body').animate({scrollTop: $(window).height()}, scrollTime, 'swing');
    }

    // scroll on window resize
    $(window).resize(function(){ window.scrollTo(0, $(window).height()); });
}

function scrollUp(fast){
    if (fast === true){
        window.scrollTo(0, 0);
    }else {
        $('html, body').animate({scrollTop: 0}, scrollTime, 'swing');
    }

    // scroll on window resize
    $(window).resize(function(){ window.scrollTo(0, 0); })
}

function setUsername(username){
    $('.username').text(username);
}


function next_page(){
    page += 1;
    search_profiles();
    return false;
}

function previous_page(){
    page -= 1;
    search_profiles();
    return false;
}


function formProfileRow(data){
    var profile_row = $("<tr></tr>");
    var status_display = statuses[data.status];

    var username = $("<td></td>");
    // in this way data will be escaped
    username.text(data.username);
    var status = $("<td></td>");
    status.text(status_display);

    profile_row.append(username);
    profile_row.append(status);

    return profile_row
}


function formPaginationButton(direction, is_active, callable){
    if (is_active){
        var li = $("<li><a href='#'></a></li>");
        li.children().text(direction);
    }else {
        var li = $("<li></li>");
        li.text(direction);
    }

    li.addClass('pagination-' + direction);

    if (is_active){
        li.click(callable);
    } else {
        li.addClass('disabled');
    }

    return li;
}

function updateFoundProfiles(data){
    var tbody = $('#profiles-tbody');
    var pagination = $('#profile-pagination');

    tbody.empty();
    pagination.empty();

    if (data == undefined || data.results.length == 0){
        tbody.append('<td>No results</td><td></td>');
        return
    }

    var profiles = data.results;

    for(var i = 0; i < profiles.length; i++){
        tbody.append(formProfileRow(profiles[i]));
    }

    var next_link = data.next;
    var previous_link = data.previous;

    var current = $('<li><a href="#" onclick="false;" class="current-page">' + page + '</a></li>');
    current.click(function(e) { return false; });

    var next = formPaginationButton('next', !!next_link, next_page);
    var previous = formPaginationButton('previous', !!previous_link, previous_page);


    pagination.append(previous);
    pagination.append(current);
    pagination.append(next);

    pagination.append(pagination);
}


$(function(){
    $(document).foundation();

    $('#username-input').keypress(function(){
        if (event.which == 13 && !event.shiftKey) {
            login();
            event.preventDefault();
        }
    });

    $('#search-input').keypress(function(){
        if (event.which == 13 && !event.shiftKey) {
            search_profiles();
            event.preventDefault();
        }
    });

    $('#my-status-select').change(function(){
        updateUserStatus($(this).val());
    });

    $('#search-status-select').change(function(){
        search_profiles();
    });

    $('*').each(function() {
        $(this).attr('tabindex', '-1');
    });
});
