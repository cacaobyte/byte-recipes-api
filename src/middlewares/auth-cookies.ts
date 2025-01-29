// import { Context, Next } from 'hono';
// // import { bearerAuth } from 'hono/bearer-auth';
// import { getSignedCookie } from 'hono/cookie';
// import { decode } from 'hono/jwt';

// export const authenticate = async (c: Context, next: Next) => {
//   console.log('Authenticating user...');

//   // Intentar autenticar utilizando el token Bearer en el encabezado Authorization
//   const auth = bearerAuth({
//     verifyToken: async (token, c) => {
//       try {
//         // Aquí puedes decodificar y verificar el token según tus necesidades
//         const decodedToken = await decode(token);
//         console.log('Decoded Token:', decodedToken);

//         // Si la verificación es exitosa, puedes almacenar la información del usuario en el contexto
//         c.set('user', decodedToken);
//         return true;
//       } catch (error) {
//         console.error('Token verification failed:', error);
//         return false;
//       }
//     },
//   });

//   // // Ejecutar el middleware bearerAuth
//   // const bearerAuthResult = await auth(c, next);

//   // // Si la autenticación con Bearer falla, intentar con el token en las cookies
//   if (!bearerAuthResult) {
//     try {
//       const signedToken = await getSignedCookie(c, c.env.JWT_SECRET, 'accessToken');
      
//       if (!signedToken) {
//         return c.json({ error: 'Unauthorized - No token provided' }, 401);
//       }

//       // Decodificar y verificar el token de la cookie
//       const decodedToken = await decode(signedToken);
//       console.log('Decoded Token from Cookie:', decodedToken);

//       // Almacenar la información del usuario en el contexto
//       c.set('user', decodedToken);
//       await next();
//     } catch (error) {
//       console.error('Cookie verification failed:', error);
//       return c.json({ error: 'Unauthorized - Invalid token' }, 401);
//     }
//   } else {
//     await next();
//   }
// };


// import { Context, Next } from 'hono';
// import { decode } from 'hono/jwt';
// import { getSignedCookie } from 'hono/cookie';

// export const authenticate = async (c: Context, next: Next) => {
//   console.log('Authenticating user...');
  
//   try {
//     // Leer el JWT desde el encabezado Authorization
//     const authHeader = c.req.header('Authorization');

//     console.log('Auth Header:', authHeader);
    

//     const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

//     console.log('Token:', token);

//     const signedToken = await getSignedCookie(c, c.env.JWT_SECRET, 'accessToken');

//     console.log('Signed Token:', signedToken);
    
//     const decodedToken = await decode(signedToken)
    
//     console.log('Decoded Token:', decodedToken);
    
//     // 
//     if (!token) {
//       const signedToken = getSignedCookie(c, c.env.JWT_SECRET);
//       if (!signedToken) {
//         return c.json({ error: 'Unauthorized - No token provided' }, 401);
//       }
//       c.set('user', signedToken);
//     } else {
//       // Validar el token usando jwt middleware
//       const result = jwt({ secret: c.env.JWT_SECRET });
//       await result(c, next);

//       console.log('JWT:', c.get('jwt'));
      

//       // Obtener los datos del usuario directamente desde el token decodificado
//       const decodedToken = c.get('jwt');

//       console.log('Decoded Token:', decodedToken);

//       // Si la validación pasa, agregar la información del usuario al contexto
//       c.set('user', c.get('jwt'));
//     }

//     await next();
//   } catch {
//     return c.json({ error: 'Unauthorized - Invalid token' }, 401);
//   }
// };