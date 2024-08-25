import { jwtVerify, SignJWT, } from "jose";
export const getJwtSecretKey = () => {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable JWT_SECRET is not set.");
    }
    return secret;
};
export async function verifyJwtToken(token:any) {
    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        );
        return verified.payload;
    } catch (error) {
        throw new Error("Your token is expired");
    }
}

export async function signJwtToken(payload: any, expiresIn: string) {
    try {
        const secretKey = getJwtSecretKey();
        console.log('Payload:', payload);
        const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(expiresIn)
            .sign(new TextEncoder().encode(secretKey));
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Error generating token");
    }
}