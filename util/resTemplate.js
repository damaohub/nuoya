module.exports = {
    res:(ctx,status,msg,data) => {
        if(!data){
            ctx.response.status= status;
            ctx.response.body = msg;
        }else {
            ctx.body = data;
        }
    },
    paramError: (msg, code, selfData) => {
        if(!selfData){
            return {
                code: code || 40000,
                msg: msg + '是无效字段'
                }
        }else {
            return {
                code: code || 40000,
                msg: selfData
                }
        }
    },
    resApi: (code,msg,data) => {
            return {
                code: code || 40000,
                msg: msg,
                data: data 
            }
    },

    catchError: (ctx,code,e) =>{
        ctx.response.status= 400;
        ctx.response.body= {
            code: !code ? 'internal:unknown_error' : code,
            data: e
         }      
    },
    successTemp: (ctx,code,data)=>{
        console.log(code)
        ctx.response.status= 200;
        ctx.response.body= {
            code: !data.code ? code :data.code,
            msg: 'sscuss',
            data: data
         };
    }
    
}
