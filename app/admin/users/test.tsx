const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userList = await getAllUsers();
      setUsers(userList);
    } catch (err) {
      setError("Error fetching users.");
    } finally {
      setIsLoading(false);
    }
  };