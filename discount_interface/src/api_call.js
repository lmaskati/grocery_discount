export async function makeApiCall(item, all_res) {
    const fetchList = async () => {
      const result = await fetch('https://grocery-sg-flask.herokuapp.com/' + item, {
        headers: new Headers({
          'content-type': 'application/json',
        }),
        method: 'GET',
      });
      if (!result.ok) {
        alert("Something went very wrong!");
        return;
      }
      var results = await result.json();
      const total_results = all_res.concat(results);
      return total_results
      
    };
    return fetchList();
  }