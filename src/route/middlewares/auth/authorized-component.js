const listPermissionNameComponent = {
  AllRole: "manage-roles",
  AddRole: "manage-roles",
  EditRole: "manage-roles",

  AllPermission: "manage-permissions",
  AddPermission: "manage-permissions",
  EditPermission: "manage-permissions",
};

const listPermissionItemMenu = {};

const listPermissionMenu = {
  ROLE_PERMISSION_MENU: ["manage-roles", "manage-permissions"],
};

const isUserHasPermission = (componentName, permissionsUser) => {
  if (!permissionsUser.includes(listPermissionNameComponent[componentName])) {
    return false;
  }

  return true;
};

const isUserHasPermissionTreeMenu = (permissions, permissionsUser) => {
  return permissions.some((val) => permissionsUser.indexOf(val) !== -1);
};

const isUserHasPermissionItemMenu = (
  permissions,
  permissionsUser,
  tagsItem
) => {
  const permissionItemMenu = listPermissionItemMenu[permissions];

  let resultCompare = permissionItemMenu.some(
    (permission) => permissionsUser.indexOf(permission) === -1
  );

  return !resultCompare ? tagsItem : "";
};

export default {
  isUserHasPermission,
  isUserHasPermissionTreeMenu,
  listPermissionMenu,
  isUserHasPermissionItemMenu,
};
