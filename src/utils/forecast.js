const request=require("request");


const forecast=(long,lat,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=db84a8f3c3aaa4a7435d9043a7969dc8&query="+encodeURIComponent(lat)+","+encodeURIComponent(long);
    request({url, json:true},(error,{body})=>{
       if(error)
       {
           callback("unable to connect to api system now",undefined);
       }
       else if(body.error)
       {
           callback("invalid location details",undefined);
       }
       else{
           callback(undefined,
               "The temperature currently is "+body.current.temperature+"C and humidity is "+body.current.humidity
           );
       }
    });
};



module.exports=forecast;