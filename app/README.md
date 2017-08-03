# HW3 - README
## Team: Weeb Applications
### Team Members: Ziyao Zhou, Ting Gu, Nikhilesh Sankaranarayanan

###Instruction:
1. Hovering over SoundBoard will show up a list for users to choose the SoundBoard version.
2. Hovering over theme will give users options to change the themes.
3. Clicking on the compact view on the right side of navigation bar will switch to compact mode. And There is another button of regular mode can switch back to regular during the compact mode.

### Experiences:
Overall, it felt a little more tedious to write our scripts in Vanilla JS,
since we had to write a lot more lines of code compared to the library version.
Using JQuery helped shorten the code and make it easier to read and write too.
However that came with a one-time cost of having to learn the syntax and functions
of JQuery from scratch.

Therefore for this project the VanillaJS version was faster to write, but in future
we will be able to speed up our development by using JQuery.

### Error checking
Another learning experience, and we simulate errors by using
invalid links to our JSON files, or using incorrect formatting between the actual
JSON and the format the Javascript expected. Appropriate error messages and
"loader images" have been added in case there's any error at runtime.

### File Size
The jquery version of the HTML is smaller than the vanilla JS file (8KB vs 8.7KB).
This is likely due to having fewer lines of code.

### Network Performance
No significant difference was observed even throttled to 3G. The JQuery library
package that gets downloaded is only around 84KB in size, which does not have
significant impact on loading times.

### TrackJs
We added the TrackJs’s CDN into our source code. Then, whenever we run our code, our website will connect to TrackJS server. Then, TrackJS will monitor our website and keep tracking our errors.

### CSS errors
All Errors and Warnings are vendor specific function.
57	Sorry, the at-rule @-webkit-keyframes is not implemented.
62	Sorry, the at-rule @-webkit-keyframes is not implemented.
3		Property -webkit-text-size-adjust is an unknown vendor extension
3		Property -ms-text-size-adjust is an unknown vendor extension
111	Property -webkit-box-flex is an unknown vendor extension
112	Property -webkit-flex is an unknown vendor extension

### HTML errors
