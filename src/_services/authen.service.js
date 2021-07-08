
export const AuthenService = {
    checkPermission,
};

function checkPermission(menu, action) {
    let result = false;
    const listMenu = JSON.parse(localStorage.getItem('listMenu'));
    let found = false;
    console.log('listMenu >',listMenu);
    for (let i = 0; i < listMenu.listGroupMenu.length; i++) {
        if (undefined !== listMenu.listGroupMenu[i].listMenu && null !== listMenu.listGroupMenu[i].listMenu && !found) {
            for (let e = 0; e < listMenu.listGroupMenu[i].listMenu.length; e++) {
                if (menu === listMenu.listGroupMenu[i].listMenu[e].menuName && !found) {
                    if (action === listMenu.listGroupMenu[i].listMenu[e].action && !found) {
                        result = true;
                        found = true;
                    }
                }
            }
        } else if((undefined ===listMenu.listGroupMenu[i].listMenu && !found) || (null === listMenu.listGroupMenu[i].listMenu && !found)){
            if (menu === listMenu.listGroupMenu[i].groupMenuName) {
                if (action === listMenu.listGroupMenu[i].action) {
                    result = true;
                    found = true;
                }
            }
        }
    }
    // result = listMenu.includes(menu);
    return result;

}