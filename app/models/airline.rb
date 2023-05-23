class Airline < ApplicationRecord
    has_many :reviews

    before_create :slugify

    def slugify
        self.slug = name.parameterize
    end

    def avg_score
        return 0 unless reviews.count.positive?
        reviews.average(:score).round(2).to_f
    end

    def above_or_equal_to_avg_score(min_score, airlines)
        a= airlines.select{|airline| airline.avg_score > min_score}
        return a
    end

    def lower_or_equal_to_avg_score(max_score, airlines)
        a = airlines.select{|airline| airline.avg_score > max_score}
        return a
    end


    scope :filter_by_name, lambda{ |keyword| where('lower(name) LIKE ?', "%#{keyword.downcase}%")}
    # scope :above_or_equal_to_avg_score, lambda { |number| select(|i| i.avg_score < number)}
    # scope :lower_or_equal_to_avg_score, lambda{ |number| select(|i| i.avg_score > number)}
    scope :recent, -> { order(:updated_at)}
  



    def self.search(params = {})
        airlines = params[:airline_ids].present? ? airline.where(id: params[:airline_ids]) : Airline.all
        # raise
        airlines = airlines.filter_by_name(params[:keyword]) if params[:keyword]
        # airlines = above_or_equal_to_avg_score(params[:min_avg_score].to_f, airlines) if params[:min_avg_score]
        # airlines = lower_or_equal_to_avg_score(params[:max_avg_score].to_f, airlines) if params[:max_avg_score]
        if params[:min_avg_score]
            airlines = airlines.select{|airline| airline.avg_score > params[:min_avg_score].to_f}
        end
        if params[:max_avg_score]
            airlines = airlines.select{|airline| airline.avg_score < params[:max_avg_score].to_f}
        end
        airlines = airlines.recent if params[:recent]
        airlines
    end
end
