module.exports = {
    res:(ctx,status,msg,data) => {
        if(!data){
            ctx.response.status= status;
            ctx.response.body = msg;
        }else {
            ctx.body = data;
        }
    },
    resApi: (ctx, code,msg,data) => {
        ctx.response.status= 200;
        ctx.response.body= {
            code: code,
            msg: msg,
            data: data
         };
    },

    paramError:(paramName,_code,text,selfData) => {
        var content = !text ? '是无效字段':text; 
        if(!selfData){
            return {
                    code: _code || 50000,
                    msg:paramName+content
                }
        }else {
            return {
                    msg:selfData
                }
        }
    },

    catchError: (ctx,code,e) =>{
        ctx.response.status= 200;
        ctx.response.body= {
            code: !code ? 'internal:unknown_error' : code,
            msg: e
         }      
    },
    successTemp: (ctx,code,data)=>{
        ctx.response.status= 200;
        ctx.response.body= {
            code: !data.code ? code : data.code,
            msg: 'sscuss',
            data: data
         };
    }
    
}
