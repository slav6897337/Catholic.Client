
const Actions = {
  redirect: (path: string) => {
    window.open(path, '_blank');
  },
  navigate: (path: string) => {
    window.open(path);
  },

};

export default Actions;