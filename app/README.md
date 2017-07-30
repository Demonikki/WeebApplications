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
Add in the CDN of trackJS, then the trackJS server will monitor our project afterward.
