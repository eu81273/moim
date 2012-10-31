package moim.place.service;

import java.util.List;

import jcf.query.core.QueryExecutor;


import moim.place.model.PlacePaging;
import moim.place.model.Place;
import moim.place.model.PlaceUsed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceServiceImpl implements PlaceService {

	@Autowired
	private QueryExecutor queryExecutor;

	@Override
	public void insertPlace(Place place) {
		queryExecutor.update("place.insertPlace", place);
	}

	@Override
	public void deletePlace(String id) {
		queryExecutor.update("place.deletePlace", id);
	}


	@Override
	public void updatePlace(Place place) {
		queryExecutor.update("place.updatePlace", place);
	}


	@Override
	public List<Place> getPlace(String plaId) {
		Place place = new Place();
		place.setPlaId(plaId);
		return  queryExecutor.queryForList("place.selectPlace", place , Place.class);
	}

	@Override
	public List<Place> getPagePlace(PlacePaging paging) {
		return queryExecutor.queryForList("place.selectPagePlace", paging, Place.class);
	}


	@Override
	public List<PlaceUsed> getUsedPlace(PlaceUsed placeUsed) {

		return queryExecutor.queryForList("place.selectPlaceUsed", placeUsed, PlaceUsed.class);
	}

	@Override
	public int getCountPlaceused(String id) {
		return  queryExecutor.queryForInt("place.getCountPlaceUsed", id);
	}

	@Override
	public void deletePlaceused(PlaceUsed placeUsed) {
		queryExecutor.update("place.deletePlaceused", placeUsed);
	}

	@Override
	public void insertPlaceused(PlaceUsed placeUsed) {
		queryExecutor.update("place.insertPlaceUsed", placeUsed);
	}

	@Override
	public List<PlaceUsed> getPlan(String meeId) {
		return  queryExecutor.queryForList("place.selectPlan", meeId, PlaceUsed.class);
	}



}
