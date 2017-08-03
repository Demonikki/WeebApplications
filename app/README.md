# HW4 - README
## Team: Weeb Applications
### Team Members: Ziyao Zhou, Ting Gu, Nikhilesh Sankaranarayanan

#### Please see Summary for more detailed breakdown

###Instruction:
1. Hovering over SoundBoard will show up a list for users to choose the SoundBoard version.
2. Hovering over theme will give users options to change the themes.
3. Clicking on the compact view on the right side of navigation bar will switch to compact mode. And There is another button of regular mode can switch back to regular during the compact mode.

### Improvements:
We used JQuery for HW4, building off of the JQuery version of HW3. There is significant
refactoring of the JavaScript files to have a more consistent naming convention.
Variable names were changes across the file and functions were organized, renamed
and grouped appropriately. Commenting is kept to a minimum as function and Variable
names are quite descriptive.

### TrackJs
We added the TrackJs’s CDN into our source code. Then, whenever we run our code,
our website will connect to TrackJS server. Then, TrackJS will monitor our website
and keep tracking our errors. Calls to it are made where seen necessary.

### CSS errors
All Errors and Warnings are vendor specific rules.
Line 3:         Property -webkit-text-size-adjust is an unknown vendor extension; same for -ms- version
Lines 57, 62:   @-webkit-keyframes
Line 111:	    Property -webkit-box-flex is an unknown vendor extension
Line 112:   	Property -webkit-flex is an unknown vendor extension

These are all used for proper animations and work perfectly with Chrome.

### HTML validation errors
1 ERROR:
Line 39: Element div not allowed as child of element ul in this context.
>When developing the dropdown menu, we neglected to change its parent from a
ul element to a proper div element. Then, it became too difficult to change without
updating all rules across 3 CSS files and we ran out of time.
