JSlider is a simple javascript library to create slideshow

<b>Template to use :</b>
```
  <div id="myJSlider">
    <div class="jslide">
      <!-- First slide -->
    </div>
    <div class="jslide">
      <!-- Second slide -->
    </div>
    <div class="jslide">
      <!-- Third slide -->
    </div>
    ...
  </div>
```

<b>Initialization :</b>
```
  <script>
    $(document).ready(function() {
  		$("#myJSlider").JSlider();
  	});
  </script>
```
<br>
You can use options to adapt your slideshown to your needs :
  - <b><i>enableLoop</i></b> [true/false] : enable or disable slide loop
  - <b><i>enableKeyboardControl</i></b> [true/false] : enable or disable keyboard control (right and left arrow)
  - <b><i>enableArrowControl</i></b> [true/false] : enable or disable arrow control (on the screen)
  - <b><i>initialSlideIndex</i></b> [Number] : the first slide to display
  
For this, use the syntax : 
```
$("#myJSlider").JSlider({option: value, option2: value2});
```
