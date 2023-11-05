if(process.env.NODE_ENV=='production'){
    module.exports=process.env.cloud;
}else{
 module.exports=require('./cloud')
}