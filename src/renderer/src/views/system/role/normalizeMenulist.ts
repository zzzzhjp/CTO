import { IRoleTree  } from '@api/role'
const normalizeMenuList = ( list:IRoleTree[] , cb:(menu:IRoleTree)=>void =()=>null):IRoleTree[]=>{
    const menuMap = new Map(list.map(menu=>[menu.id,{...menu, children: []}]));
    const result:IRoleTree[] = [];

    list.forEach((menu:IRoleTree)=>{
        cb(menu);
        if( menu.parentId === '-1' || menu.parentId === '0' || menu.parentId === 0 || !menu.parentId ){
            return result.push( menuMap.get(menu.id)! );
        }
        const parent = menuMap.get( menu.parentId.toString() );
        parent && parent.children?.push( menuMap.get(menu.id)! );
        return ;
    })
    sortMenuList( result );
    return result
}
function sortMenuList( list:IRoleTree[] ){
    list.sort((a,b)=>a.sort - b.sort );
    list.forEach((item:IRoleTree)=>{
        if( Array.isArray(item.children) && item.children.length > 1){
            sortMenuList( item.children );
        }
    })
}

export default normalizeMenuList;