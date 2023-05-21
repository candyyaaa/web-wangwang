/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 11:59:11
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 12:00:34
 */
import { resolve } from 'path'


export const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir)