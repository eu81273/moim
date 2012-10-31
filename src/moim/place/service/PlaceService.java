package moim.place.service;

import java.util.List;

import moim.place.model.PlacePaging;
import moim.place.model.Place;
import moim.place.model.PlaceUsed;

public interface PlaceService {

	public List<Place> getPlace(String plaId);

	public void insertPlace(Place place);

	public void deletePlace(String id);

	public void updatePlace(Place place);

	public List<Place> getPagePlace(PlacePaging paging);

	public List<PlaceUsed> getUsedPlace(PlaceUsed placeUsed);

	public int getCountPlaceused(String id);

	public void deletePlaceused(PlaceUsed placeUsed);

	public void insertPlaceused(PlaceUsed placeUsed);

	public List<PlaceUsed> getPlan(String meeId);
}
