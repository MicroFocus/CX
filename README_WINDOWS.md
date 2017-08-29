# CX-App Note for Windows Users

If you use Windows you must take two extra steps to use the Docker container for the CX app.

1. You must disable the windows Firewall.  This makes it possible for the Docker container to accept incoming requests.

2. You must add your C drive to the list of shared drives.  Go to the Docker settings and select Shared Drives.  In that panel check the box next to the C drive to share it and press the Apply button.