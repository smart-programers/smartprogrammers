

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { cookies } from 'next/headers';
import { getUser } from './app/actions/user';


function matchURL(url:string, matchURL:string){
    const regex = new RegExp(matchURL)
    return regex.test(url)
}


export async function middleware(req: NextRequest) {

  const res = NextResponse.next()


  const token = await getUser();
 

  if(token.success === false){
    if(matchURL(req.nextUrl.pathname,"/home(.*)")){
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/'
  return NextResponse.redirect(redirectUrl)
    }

    if(matchURL(req.nextUrl.pathname,"/projects(.*)")){
        
  return NextResponse.next()
    }

    if(matchURL(req.nextUrl.pathname,"/courses(.*)")){
        
        return NextResponse.next()
          }

          if(matchURL(req.nextUrl.pathname,"/auth/login(.*)")){
        
            return NextResponse.next()
              }

              if(matchURL(req.nextUrl.pathname,"/auth/register(.*)")){
        
                return NextResponse.next()
                  }
                  if(matchURL(req.nextUrl.pathname,"/(.*)")){
        
                    return NextResponse.next()
                      }
  }


  if(token.success === true){
    if(matchURL(req.nextUrl.pathname,"/home(.*)")){
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/'
  return NextResponse.redirect(redirectUrl)
    }

    if(matchURL(req.nextUrl.pathname,"/projects(.*)")){
        
  return NextResponse.next()
    }

    if(matchURL(req.nextUrl.pathname,"/courses(.*)")){
        
        return NextResponse.next()
          }

          if(matchURL(req.nextUrl.pathname,"/auth/login(.*)")){
        
            const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/'
  return NextResponse.redirect(redirectUrl)
              }

              if(matchURL(req.nextUrl.pathname,"/auth/register(.*)")){
        
                const redirectUrl = req.nextUrl.clone()
                redirectUrl.pathname = '/'
          return NextResponse.redirect(redirectUrl)
                  }

                  if(matchURL(req.nextUrl.pathname,"/(.*)")){
        
                    return NextResponse.next()
                      }

  }
   

 

  return res
}

export const config = {
  matcher: [
    
    '/',
    '/auth/login',
    '/auth/register',
    '/courses',
    '/projects'
   
    
  ],
}
