var menus = [
	{
	     "name": "message_link",
	     "urls": ["/message.do"],
	     "topID": "main01",
	     "parentID": "group-1"
	},
	{
	     "name": "filesend_link",
	     "urls": ["/filesend.do"],
	     "topID": "main01",
	     "parentID": "group-1"
	},
	{
	     "name": "eventmessage_link",
	     "urls": ["/eventsend.do"],
	     "topID": "main01",
	     "parentID": "group-1"
	},
	{
	     "name": "emplsend_link",
	     "urls": ["/emplsms/emplsend.do"],
	     "topID": "main01",
	     "parentID": "group-1"
	},
	{
	     "name": "all_address_link",
	     "urls": ["/all-address.do","/contact-list.do","/contact-detail.do"],
	     "topID": "main01",
	     "parentID": "group-4"
	},
	{
	     "name": "personal_address_link",
	     "urls": ["/personal-address.do"],
	     "topID": "main01",
	     "parentID": "group-4"
	},
	{
         "name": "share_address_link",
         "urls": ["/share-address.do"],
         "topID": "main01",
         "parentID": "group-4"
	},
	{
        "name": "fileupload_address_link",
        "urls": ["/upload-address.do"],
        "topID": "main01",
        "parentID": "group-4"
	},
   {
        "name": "mymessage_link",
        "urls": ["/mymessage.do"],
        "topID": "main01",
        "parentID": "group-2"
   },
   {
        "name": "reservedmessage_link",
        "urls": ["/reservedmessage.do"],
        "topID": "main01",
        "parentID": "group-2"
   },
   {
        "name": "happy_link",
        "urls": ["/form/happy.do"],
        "topID": "main01",
        "parentID": "group-3"
   },
   {
        "name": "head_link",
        "urls": ["/form/head.do"],
        "topID": "main01",
        "parentID": "group-3"
   },
   {
        "name": "personal_link",
        "urls": ["/form/personal.do"],
        "topID": "main01",
        "parentID": "group-3"
   },
   {
        "name": "dept_link",
        "urls": ["/form/dept.do"],
        "topID": "main01",
        "parentID": "group-3"
   },
   {
       "name": "envset_link",
       "urls": ["/envset.do"],
       "topID": "main01",
       "parentID": "group-5"
   },
   {
       "name": "smsUnsubscribe_link",
       "urls": ["/smsUnsubscribe.do"],
       "topID": "main01",
       "parentID": "group-5"
   },
   {
       "name": "changePassword_link",
       "urls": ["/changepassword.do"],
       "topID": "main01",
       "parentID": "group-5"
   },
   {
       "name": "nevigation_link",
       "urls": ["/nevigation.do"],
       "topID": "main02",
       "parentID": "group-6"
   },
   {
       "name": "reservationStatus_link",
       "urls": ["/reservationStatus.do"],
       "topID": "main02",
       "parentID": "group-6"
   },
   {
	   "name": "smsreq_link",
	   "urls": ["/smsreq.do"],
	   "topID": "main02",
	   "parentID": "group-6"
   },
   {
	   "name": "smssendlist_link",
	   "urls": ["/smssendlist.do","/smssendlist-detail.do"],
	   "topID": "main02",
	   "parentID": "group-6"
   },
   {
	   "name": "confirmlist_link",
	   "urls": ["/confirmlist.do","/confirmlist-detail.do"],
	   "topID": "main02",
	   "parentID": "group-7"
   },
   {
     "name": "employee_link",
     "urls": ["/admin/employee.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "authorizer_link",
     "urls": ["/admin/authorizer.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "admin_link",
     "urls": ["/admin/admin.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "directlogin_link",
     "urls": ["/admin/directlogin.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "motplogin_link",
     "urls": ["/admin/motplogin.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "notice_link",
     "urls": ["/admin/notice.do","/admin/notice-detail.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "login_history_link",
     "urls": ["/admin/login-history.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "menu06",
     "urls": ["/menu06.do","/notice-menu06-detail.do"],
     "topID": "main02",
     "parentID": "group-8"
   },
   {
     "name": "loglist_link",
     "urls": ["/admin/loglist.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
     "name": "user_link",
     "urls": ["/admin/user.do"],
     "topID": "main03",
     "parentID": "group-8"
   },
   {
	     "name": "template_link",
	     "urls": ["/template-list.do"],
	     "topID": "main03",
	     "parentID": "group-8"
   }
 ];

var link = document.location.href;
for (var i = 0; i < menus.length; i++){
    for(var k = 0 ; k < menus[i].urls.length ; k++){
        if(link.indexOf(menus[i].urls[k]) > 0){
            document.getElementById(menus[i].name).className = " sublabel on";
            document.getElementById(menus[i].topID).style.display="";
            document.getElementById(menus[i].parentID).checked = true;
        }
    }
}

