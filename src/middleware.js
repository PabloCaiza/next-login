import {NextResponse} from "next/server";
import {jwtVerify} from  'jose'
export async function middleware(request){
//verifica accesos
    // start date -end data
    // day js manejar
        const jwt=request.cookies.get('token')
        console.log(jwt)
        if(!jwt){
            return NextResponse.redirect(new URL('/login',request.url))
        }
        try {
            const {payload}=await jwtVerify(jwt.value,new TextEncoder().encode('secret1234#@!$%545dfsAsd#@!'))
        }catch (error){
            console.error(error)
            return NextResponse.redirect(new URL('/login',request.url))

        }

    return NextResponse.next()

}

export const config={
    matcher:['/dashboard','/']
}