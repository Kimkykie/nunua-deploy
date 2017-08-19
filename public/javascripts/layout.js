 $(document).ready(function () {
  // Toggle the sidebar to show and hide
   $('#toggle').click(function () {
     $('.ui.sidebar').sidebar('toggle')
   })
  // Sidebar transitions
   if ($('.ui.left.sidebar').hasClass('hidden')) {
     $('.ui.left.sidebar').transition('fade')
   } else {
     $('.ui.left.sidebar').transition('fade out')
   }
  // Action to show extra prediction in cards
   $('.more-predictions').on('click', function () {
     $el = $(this)
     $p = $el.parent()
     $up = $p.parent()
     $upbtn = $up.find('.more-predictions')
     $moreLess = $upbtn.find('.more-less')
     $viewMore = $upbtn.find('.view-more')
     $ups = $up.find('.more')
     if ($ups.hasClass('show-more')) {
       $viewMore.hide()
       $moreLess.text('LESS')
       $ups.transition('fade down')
       $ups.removeClass('show-more')
     } else {
       $viewMore.show()
       $moreLess.text('MORE')
       $ups.transition('fade up')
       $ups.addClass('show-more')
     }
     console.log()
   })
  // Action to dynamically add input fields to enter prediction data
   var addFields = $('#addFields')
   var fieldWrapper = $('#fields')
   var fieldHtml =
     `<div class="five fields">
          <div class="field">
            <label>Date</label>
            <div class='ui calendar date-picker'>
               <div class="ui left labeled icon input">
                   <input type="text" placeholder="Date" name="date[]"> <i class="calendar icon"></i>
               </div>
            </div>
          </div>
          <div class="field">
            <label>Time</label>
            <div class="ui calendar time-picker">
               <div class="ui left labeled icon input">
                   <input type="text" placeholder="Time" name="time[]"> <i class="wait icon"></i>
               </div>
            </div>
          </div>
          <div class="field">
            <label>Team 1</label>
            <div class="ui left labeled icon input">
                <input type="text" placeholder="Team 1" name="team1[]"> <i class="soccer icon"></i></div>
        </div>
        <div class="field">
            <label>Team 2</label>
            <div class="ui left labeled icon input">
                <input type="text" placeholder="Team 2" name="team2[]"> <i class="soccer icon"></i></div>
        </div>
        <div class="field">
          <label>Prediction</label>
          <div class="ui selection dropdown">
              <input type="hidden" name="prediction[]"><i class="dropdown icon"></i>
              <div class="default text">Prediction</div>
              <div class="menu">
                  <div class="item" data-value="GG">GG</div>
                  <div class="item" data-value="Home Win (1)">Home Win (1)</div>
                  <div class="item" data-value="Draw">Draw</div>
                  <div class="item" data-value="Over (2.5)(1.5)">Over (2.5)(1.5)</div>
                  <div class="item" data-value="Away Win (1)">Away Win (1)</div>
                  <div class="item" data-value="Over/Under 1.5">Over/Under 1.5</div>
              </div>
          </div>
        </div>
</div>`

   $(addFields).click(function (e) {
     e.preventDefault()
     $(fieldWrapper).append(fieldHtml).each(function () {
      // Activate dropdown and calendar options for added input fields
       $('.ui.dropdown').dropdown({
         on: 'hover'})
       $('.date-picker').calendar({
         type: 'date'
       })
       $('.time-picker').calendar({
         type: 'time'
       })
     })
   })
 })
