export default [
  {
    _id: "1",
    title: "Bags",
    src: [
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSEDmzqhh1nog0PFij6BxMqfU6BTKz_cWLbYTznMIsiD6--TPAq&usqp=CAY",
        "https://www.goyard.com/media/catalog/product/cache/ce3c1d3c10ece5b9970cb5f53cd72146/S/A/SAC_HOBO_BOHEME_PM_3087.jpg",
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSSGQACbI4X64y20aE-POtl3mg1_-0kI18lJjDx6Tm52OkwPOZiVp8aEd4dYnlHrWwMfZ2uX_cMXIG8IEAxg_9A6WV3C_y9shvNSgiIiuMCzVpX6w8MVXmmJQ&usqp=CAE"
    ],
    /* 
    activeOrNot should be automatically initialized once src is created in backend 
    length equal to length of src and set the first one be "active"
    */
    activeOrNot: [
      "active",
      "",
      ""
    ],
    description: "Good bag",
    /* truncated the first 2/3 sentences from artwork's uploaded description in AddArt Page */
    content: "short description of bag. ",
    /* rest of part */ 
    detailcontent: "more more more more more more content", 
    price: 23,
    count: 1
  },
  {
    _id: "2",
    title: "Painting",
    src: [
        "https://artfulparent.com/wp-content/uploads/2016/06/painting-ideas-featured-1.png",
        "https://d1e00ek4ebabms.cloudfront.net/production/a4c161aa-5365-458d-b5b0-e03c98eb1e78.jpg",
        "https://cdn.britannica.com/88/183488-050-EAF0F822/Chairman-of-the-Board-1971-Helen-Frankenthaler.jpg"
    ],
    activeOrNot: [
      "active",
      "",
      ""
    ],
    description: "Good Paint",
    content: "short description of paint. ",
    detailcontent: "more more more more more more content", 
    price: 34,
    count: 2
  },
];

