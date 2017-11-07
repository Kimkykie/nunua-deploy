import dompurify from 'dompurify'

function addFields (e) {
  e.preventDefault()
  const fieldWrapper = document.querySelector('#fields')
  const fieldHtml =
  `<div class="five fields">
       <div class="five wide fluid field required">
         <label>Date</label>
         <div class='ui calendar date-picker'>
            <div class="ui left labeled icon input">
                <input type="text" placeholder="Date" name="date[]"> <i class="calendar icon"></i>
            </div>
         </div>
       </div>
       <div class="five wide fluid field required">
         <label>Home Team</label>
         <div class="ui left labeled icon input">
             <input type="text" placeholder="Home Team" name="home[]"> <i class="soccer icon"></i>
         </div>
     </div>
     <div class="five wide fluid field required">
         <label>Away Team</label>
         <div class="ui left labeled icon input">
             <input type="text" placeholder="Away Team" name="away[]"> <i class="soccer icon"></i></div>
     </div>
     <div class="field stackable eight wide mobile required">
     <label>Prediction</label>
     <div class="ui dropdown prediction_input">
       <input type="hidden" name="prediction[]"/>
       <div class="default text">Prediction</div>
       <div class="menu">
         <div class="header">Categories</div>
         <div class="item"><i class="dropdown icon"></i><span class="text">3-Way</span>
           <div class="menu">
             <div data-value="3-Way 1-Home Win" class="item">3-Way 1-Home Win</div>
             <div data-value="3-Way X-Draw" class="item">3-Way X-Draw</div>
             <div data-value="3-Way 2-Away Win" class="item">3-Way 2-Away Win</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Double Chance</span>
           <div class="menu">
             <div data-value="Double Chance 1X - Home/Draw" class="item">Double Chance 1X - Home/Draw</div>
             <div data-value="Double Chance 12 - Home/Away" class="item">Double Chance 12 - Home/Away</div>
             <div data-value="Double Chance X2 - Draw/Away" class="item">Double Chance X2 - Draw/Away</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Over 2.5/ Under</span>
           <div class="menu">
             <div data-value="Over 2.5" class="item">Over 2.5</div>
             <div data-value="Under 2.5" class="item">Under 2.5</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Both teams to score</span>
           <div class="menu">
             <div data-value="Both teams to score - Yes" class="item">Both teams to score - Yes</div>
             <div data-value="Both teams to score - No" class="item">Both teams to score - No</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">3-Way First Half</span>
           <div class="menu">
             <div data-value="3-Way First Half - 1" class="item">3-Way First Half - 1</div>
             <div data-value="3-Way First Half - X" class="item">3-Way First Half - X</div>
             <div data-value="3-Way First Half - 2" class="item">3-Way First Half - 2</div>
           </div>
         </div>
         <div class="divider"></div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Double Chance First Half</span>
           <div class="menu">
             <div data-value="Double Chance First Half - 1X" class="item">Double Chance First Half - 1X</div>
             <div data-value="Double Chance First Half - 12" class="item">Double Chance First Half - 12</div>
             <div data-value="Double Chance First Half - X2" class="item">Double Chance First Half - X2</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Over 1.5 First Half</span>
           <div class="menu">
             <div data-value="Over 1.5 First Half - Over" class="item">Over 1.5 First Half - Over</div>
             <div data-value="Over 1.5 First Half - Under" class="item">Over 1.5 First Half - Under</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Over 2.5 First Half</span>
           <div class="menu">
             <div data-value="Over 2.5 First Half - Over" class="item">Over 2.5 First Half - Over</div>
             <div data-value="Over 2.5 First Half - Under" class="item">Over 2.5 First Half - Under</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Both teams to score</span>
           <div class="menu">
             <div data-value="Both teams to score HT - Yes" class="item">Both teams to score HT - Yes</div>
             <div data-value="Both teams to score HT - No" class="item">Both teams to score HT - No</div>
           </div>
         </div>
         <div class="item"><i class="dropdown icon"></i><span class="text">Half time/Full time</span>
           <div class="menu">
             <div data-value="Half time/Full time 1/1" class="item">Half time/Full time 1/1</div>
             <div data-value="Half time/Full time 1/X" class="item">Half time/Full time 1/X</div>
             <div data-value="Half time/Full time 1/2" class="item">Half time/Full time 1/2</div>
             <div data-value="Half time/Full time X/1" class="item">Half time/Full time X/1</div>
             <div data-value="Half time/Full time X/X" class="item">Half time/Full time X/X</div>
             <div data-value="Half time/Full time X/2" class="item">Half time/Full time X/2</div>
             <div data-value="Half time/Full time 2/1" class="item">Half time/Full time 2/1</div>
             <div data-value="Half time/Full time 2/X" class="item">Half time/Full time 2/X</div>
             <div data-value="Half time/Full time 2/2" class="item">Half time/Full time 2/2</div>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
  <hr class="add_divider"/>
  `
  fieldWrapper.insertAdjacentHTML('beforeend', dompurify.sanitize(fieldHtml))
  $('.ui.dropdown').dropdown({
    on: 'click' })
  const today = new Date()
  $('.ui.calendar').calendar({
    minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
  })
}

export default addFields
