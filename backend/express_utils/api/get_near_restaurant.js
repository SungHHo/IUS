const express = require("express");
const MongoDB = require("../../utils/database");

const EARTH_RADIUS = 6371; // 지구의 반지름을 km 단위로 설정합니다.

function getDistance(lat1, lon1, lat2, lon2) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2))
          * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS * c * 1000; // Distance in m

  return d;
}

function toRadians(degree) {
  return degree * (Math.PI / 180);
}

module.exports = {
    route: "restaurant",
    func: async (req, res) => {
        let x = req.body.x;
        let y = req.body.y;
        let distance = req.body.distance;

        if (!x || !y || distance)
            return res.json({
                failed: true,
                msg: "BAD REQUEST"
            });

        let allData = await MongoDB.getData("restaurant", {});
        // filter
        allData = allData.filter(l => getDistance(x, y, l.x, l.y) <= distance);

        return res.json(allData);
    }
};