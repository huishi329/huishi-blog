# huishi-blog

This is a simple website I set up to fetch data from WordPress API. Its frontend was sprung up with react-bootstrap for time efficiency.

Here is the full recording of a quick walkthrough of the site.
https://www.loom.com/embed/f49f7c90a76743f3ad98df5a9b2155ee


<img style="max-width:300px;" src="https://im3.ezgif.com/tmp/ezgif-3-71df9f7b7a.gif">


### Fetch data with fetch API
     useEffect(() => {
            fetch('/wp-json/wp/v2/posts')
            .then(async (res) => {
                const data = await res.json();
                setBlogs(data)
            })
            .catch(err => console.log(err))
    }, [])

