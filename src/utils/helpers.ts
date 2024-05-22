export const getProfileTypeByLogin = (login: string) => {
    return login[0] === 's' ? 'student' : 'teacher';
}