/* 
操作local数据的工具函数模块
*/

/* 
保存user
*/
export const saveUser = (user) => localStorage.setItem('user_key', JSON.stringify(user))
/* 
读取得到user
*/
export const getUser = () => JSON.parse(localStorage.getItem('user_key') || '{}')