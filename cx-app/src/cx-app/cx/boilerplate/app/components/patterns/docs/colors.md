---
name: Color palette
description: |
  #### SASS Color Variables
    ```scss
    // Primary Colors
    $color-primary-blue:                    #26a9e0;
    $color-dark-primary-blue:               #007fbf;
    $color-light-blue:                      #70cff0;
    $color-turquoise-blue:                  #00b7b7;
    $color-accent-green-blue:               #00ebb6;
      
    // Secondary Colors
    $color-gold:                            #f1c40f;
    $color-orange:                          #f39c12;
    $color-red:                             #d1281b;
    $color-purple:                          #914e8b;
    $color-magenta:                         #c6325a;
    
    // Neutrals
    $color-accent:                          #2d3d45;
    $color-primary-text:                    #3c515c;
    $color-slate-grey:                      #697c87;
    $color-secondary-text:                  #a1a6ae;
    $color-grey:                            #eae9ea;
    $color-light-grey:                      #eef2f2;
    $color-white:                           #fff;
    $color-black:                           $color-accent;
    $color-full-black:                      #000000;
    
    // Notification
    $color-nf-warning:                      #f39c12;
    $color-nf-success:                      #4CAF50;
    $color-nf-error:                        #dd5e54;
    $color-nf-global-error:                 #df4848;
    $color-nf-global-success:               #4CAF50;
    
    // Priority Colors
    $priority-0-19:                         #a1a6ae;
    $priority-20-49:                        #007fbf;
    $priority-50-79:                        #80c03c;
    $priority-80-99:                        #f39c12;
    $priority-100:                          #d71c1c;
    $priority-fg-color:                     $color-white;
    
    // Incident Priority Colors
    $incident-priority-0:                   #a1a6ae;
    $incident-priority-1:                   #007fbf;
    $incident-priority-2:                   #80c03c;
    $incident-priority-3:                   #f39c12;
    $incident-priority-4:                   #ff5627;
    $incident-priority-5:                   #d71c1c;
    $incident-priority-6:                   #900c3f;
    $incident-priority-fg-color:            $color-white;
    ```

html: |
  <ul class="palette">
    <li>
      <h3>Primary Colors</h3>
      <div style="background-color: #26a9e0;" class="color dark"><span>$color-primary-blue - #26a9e0</span></div>
      <div style="background-color: #007fbf;" class="color dark"><span>$color-dark-primary-blue - #007fbf</span></div>
      <div style="background-color: #70cff0;" class="color dark"><span>$color-light-blue - #70cff0</span></div>
      <div style="background-color: #00b7b7;" class="color dark"><span>$color-turquoise-blue - #00b7b7</span></div>
      <div style="background-color: #00ebb6;" class="color dark"><span>$color-accent-green-blue - #00ebb6</span></div>
    </li>
    <li>
      <h3>Secondary Colors</h3>
      <div style="background-color: #f1c40f;" class="color dark"><span>$color-gold - #f1c40f</span></div>
      <div style="background-color: #f39c12;" class="color dark"><span>$color-orange - #f39c12</span></div>
      <div style="background-color: #d1281b;"    class="color dark"><span>$color-red - #d1281b</span></div>
      <div style="background-color: #914e8b;" class="color dark"><span>$color-purple - #914e8b</span></div>
      <div style="background-color: #c6325a;" class="color dark"><span>$color-magenta - #c6325a</span></div>
    </li>
    <li>
      <h3>Neutrals</h3>
      <div style="background-color: #2d3d45;" class="color dark"><span>$color-accent - #2d3d45</span></div>
      <div style="background-color: #3c515c;" class="color dark"><span>$color-primary-text - #3c515c</span></div>
      <div style="background-color: #697c87;" class="color dark"><span>$color-slate-grey - #697c87</span></div>
      <div style="background-color: #a1a6ae;" class="color dark"><span>$color-secondary-text - #a1a6ae</span></div>
      <div style="background-color: #eae9ea;" class="color dark"><span>$color-grey - #eae9ea</span></div>
      <div style="background-color: #eef2f2;" class="color dark"><span>$color-light-grey - #eef2f2</span></div>
      <div style="background-color: #fff;" class="color dark"><span>$color-white - #fff</span></div>
      <div style="background-color: #000000;" class="color light"><span>$color-full-black - #000000</span></div>
    </li>
    <li>
      <h3>Notifications</h3>
      <div style="background-color: #f39c12;" class="color light"><span>color-nf-warning - #f39c12</span></div>
      <div style="background-color: #4CAF50;" class="color light"><span>color-nf-success - #4CAF50</span></div>
      <div style="background-color: #dd5e54;" class="color light"><span>color-nf-error - #dd5e54</span></div>
      <div style="background-color: #df4848;" class="color light"><span>color-nf-global-error - #df4848</span></div>
      <div style="background-color: #4CAF50;" class="color light"><span>color-nf-global-success - #4CAF50</span></div>
    </li>
    <li>
      <h3>Priority Colors</h3>
      <div style="background-color: #a1a6ae;" class="color light"><span>$priority-0-19 - #a1a6ae</span></div>
      <div style="background-color: #007fbf;" class="color light"><span>$priority-20-49 - #007fbf</span></div>
      <div style="background-color: #80c03c;" class="color light"><span>$priority-50-79 - #80c03c</span></div>
      <div style="background-color: #f39c12;" class="color light"><span>$priority-80-99 - #f39c12</span></div>
      <div style="background-color: #d71c1c;" class="color light"><span>$priority-100 - #d71c1c</span></div>
    </li>
    <li>
      <h3>Incident Priority Colors</h3>
      <div style="background-color: #a1a6ae;" class="color light"><span>$priority-0 - #a1a6ae</span></div>
      <div style="background-color: #007fbf;" class="color light"><span>$priority-1 - #007fbf</span></div>
      <div style="background-color: #80c03c;" class="color light"><span>$priority-2 - #80c03c</span></div>
      <div style="background-color: #f39c12;" class="color light"><span>$priority-3 - #f39c12</span></div>
      <div style="background-color: #ff5627;" class="color light"><span>$priority-4 - #ff5627</span></div>
      <div style="background-color: #d71c1c;" class="color light"><span>$priority-5 - #d71c1c</span></div>
      <div style="background-color: #900c3f;" class="color light"><span>$priority-6 - #900c3f</span></div>
    </li>
  </ul>
  
---
```html
<ul class="palette">
  <li>
    <h3>Primary Colors</h3>
    <div style="background-color: #26a9e0;" class="color dark"><span>$color-primary-blue - #26a9e0</span></div>
    <div style="background-color: #007fbf;" class="color dark"><span>$color-dark-primary-blue - #007fbf</span></div>
    <div style="background-color: #70cff0;" class="color dark"><span>$color-light-blue - #70cff0</span></div>
    <div style="background-color: #00b7b7;" class="color dark"><span>$color-turquoise-blue - #00b7b7</span></div>
    <div style="background-color: #00ebb6;" class="color dark"><span>$color-accent-green-blue - #00ebb6</span></div>
  </li>
  <li>
    <h3>Secondary Colors</h3>
    <div style="background-color: #f1c40f;" class="color dark"><span>$color-gold - #f1c40f</span></div>
    <div style="background-color: #f39c12;" class="color dark"><span>$color-orange - #f39c12</span></div>
    <div style="background-color: #d1281b;"    class="color dark"><span>$color-red - #d1281b</span></div>
    <div style="background-color: #914e8b;" class="color dark"><span>$color-purple - #914e8b</span></div>
    <div style="background-color: #c6325a;" class="color dark"><span>$color-magenta - #c6325a</span></div>
  </li>
  <li>
    <h3>Neutrals</h3>
    <div style="background-color: #2d3d45;" class="color dark"><span>$color-accent - #2d3d45</span></div>
    <div style="background-color: #3c515c;" class="color dark"><span>$color-primary-text - #3c515c</span></div>
    <div style="background-color: #697c87;" class="color dark"><span>$color-slate-grey - #697c87</span></div>
    <div style="background-color: #a1a6ae;" class="color dark"><span>$color-secondary-text - #a1a6ae</span></div>
    <div style="background-color: #eae9ea;" class="color dark"><span>$color-grey - #eae9ea</span></div>
    <div style="background-color: #eef2f2;" class="color dark"><span>$color-light-grey - #eef2f2</span></div>
    <div style="background-color: #fff;" class="color dark"><span>$color-white - #fff</span></div>
    <div style="background-color: #000000;" class="color light"><span>$color-full-black - #000000</span></div>
  </li>
  <li>
    <h3>Notifications</h3>
    <div style="background-color: #f39c12;" class="color light"><span>color-nf-warning - #f39c12</span></div>
    <div style="background-color: #4CAF50;" class="color light"><span>color-nf-success - #4CAF50</span></div>
    <div style="background-color: #dd5e54;" class="color light"><span>color-nf-error - #dd5e54</span></div>
    <div style="background-color: #df4848;" class="color light"><span>color-nf-global-error - #df4848</span></div>
    <div style="background-color: #4CAF50;" class="color light"><span>color-nf-global-success - #4CAF50</span></div>
  </li>
  <li>
    <h3>Priority Colors</h3>
    <div style="background-color: #a1a6ae;" class="color light"><span>$priority-0-19 - #a1a6ae</span></div>
    <div style="background-color: #007fbf;" class="color light"><span>$priority-20-49 - #007fbf</span></div>
    <div style="background-color: #80c03c;" class="color light"><span>$priority-50-79 - #80c03c</span></div>
    <div style="background-color: #f39c12;" class="color light"><span>$priority-80-99 - #f39c12</span></div>
    <div style="background-color: #d71c1c;" class="color light"><span>$priority-100 - #d71c1c</span></div>
  </li>
  <li>
    <h3>Incident Priority Colors</h3>
    <div style="background-color: #a1a6ae;" class="color light"><span>$priority-0 - #a1a6ae</span></div>
    <div style="background-color: #007fbf;" class="color light"><span>$priority-1 - #007fbf</span></div>
    <div style="background-color: #80c03c;" class="color light"><span>$priority-2 - #80c03c</span></div>
    <div style="background-color: #f39c12;" class="color light"><span>$priority-3 - #f39c12</span></div>
    <div style="background-color: #ff5627;" class="color light"><span>$priority-4 - #ff5627</span></div>
    <div style="background-color: #d71c1c;" class="color light"><span>$priority-5 - #d71c1c</span></div>
    <div style="background-color: #900c3f;" class="color light"><span>$priority-6 - #900c3f</span></div>
  </li>
</ul>

```sass
// Primary Colors
$color-primary-blue:                    #26a9e0;
$color-dark-primary-blue:               #007fbf;
$color-light-blue:                      #70cff0;
$color-turquoise-blue:                  #00b7b7;
$color-accent-green-blue:               #00ebb6;
  
// Secondary Colors
$color-gold:                            #f1c40f;
$color-orange:                          #f39c12;
$color-red:                             #d1281b;
$color-purple:                          #914e8b;
$color-magenta:                         #c6325a;

// Neutrals
$color-accent:                          #2d3d45;
$color-primary-text:                    #3c515c;
$color-slate-grey:                      #697c87;
$color-secondary-text:                  #a1a6ae;
$color-grey:                            #eae9ea;
$color-light-grey:                      #eef2f2;
$color-white:                           #fff;
$color-black:                           $color-accent;
$color-full-black:                      #000000;

// Notification
$color-nf-warning:                      #f39c12;
$color-nf-success:                      #4CAF50;
$color-nf-error:                        #dd5e54;
$color-nf-global-error:                 #df4848;
$color-nf-global-success:               #4CAF50;

// Priority Colors
$priority-0-19:                         #a1a6ae;
$priority-20-49:                        #007fbf;
$priority-50-79:                        #80c03c;
$priority-80-99:                        #f39c12;
$priority-100:                          #d71c1c;
$priority-fg-color:                     $color-white;

// Incident Priority Colors
$incident-priority-0:                   #a1a6ae;
$incident-priority-1:                   #007fbf;
$incident-priority-2:                   #80c03c;
$incident-priority-3:                   #f39c12;
$incident-priority-4:                   #ff5627;
$incident-priority-5:                   #d71c1c;
$incident-priority-6:                   #900c3f;
$incident-priority-fg-color:            $color-white;
