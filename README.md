# Maya Registration Helper 

### Steps 
- Rename `example.env` file to `.env`
- Modify your Maya credential in the `.env` file
- Modify your desire courses to be registered in the `registration.json` file in the format of :
    ```json
    {
        "COURSE_CODE": {            # COURSE CODE
            "occ": ["1", "2"]       # DESIRE OCCURANCE NO. FROM LEFT TO RIGHT
        },
        "COURSE_CODE_2": {
            "occ": ["3", "2", "1"]
        },
        ...
    }
    ```
- 

### Notes
- Course registration is performed in one tab to ensure the logout security measure from maya is not triggered.
- The program will prompt the status of registration once done. 
- The program is still under development. ***Use this program at your own risk | [Read Disclaimer](#disclaimer)***

### Disclaimer
> Maya Registration Helper is designed for educational and study purposes only. User is cautioned to use the program at your own risk. The program is not intended for commercial use, and its functionalities are solely geared towards providing a learning experience for educational purposes. Users should be aware that any engagement with the program outside the scope of its intended use is not recommended, and the creators bear no responsibility for any consequences arising from such actions