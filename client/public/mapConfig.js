window.configMap = (location) => {

    window.initMap = () => {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: location,
        });

        new google.maps.Marker({
            position: location,
            map,
        });
    }
}
