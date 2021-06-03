function getpostdata() {
    axios ({
        method : "get",
        url: 'http://localhost:3001/main/postdata'
    }).then((res) => {
        console.log(typeof(res));
        var postdata =res.data;
       console.log(typeof(res.data.id));
    }).catch((err) => {
       console.error(err);
    })
};
onload =getpostdata();