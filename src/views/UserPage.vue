<template>
  <div>
    <UserList></UserList>
  </div>
</template>
<script>

import UserList from '@/components/user/UsersList';
export default {
    name:"UserPage",
    components: {
      UserList
    }
  }
</script>